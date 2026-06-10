import random
from models.schemas import Team, GroupStanding, KnockoutMatch, TournamentResult
from tournament.predict import elo_expected_score, simulate_match
from tournament.group_stage import simulate_group


def _rank_key(s: GroupStanding):
    return (s.points, s.goal_difference, s.goals_for, -s.team.fifa_rank)


def get_qualified_teams(group_standings: dict) -> list[Team]:
    winners, runners_up, thirds = [], [], []
    for g in 'ABCDEFGHIJKL':
        s = group_standings[g]
        winners.append(s[0])
        runners_up.append(s[1])
        thirds.append(s[2])

    best_thirds = sorted(thirds, key=_rank_key, reverse=True)[:8]

    all_qualified = (
        sorted(winners, key=_rank_key, reverse=True) +
        sorted(runners_up, key=_rank_key, reverse=True) +
        sorted(best_thirds, key=_rank_key, reverse=True)
    )
    return [s.team for s in all_qualified]


def build_bracket(teams: list[Team]) -> list[tuple]:
    # Seed 1 vs Seed 32, Seed 2 vs Seed 31, etc.
    return [(teams[i], teams[31 - i]) for i in range(16)]


def pair_next_round(winners: list[Team]) -> list[tuple]:
    return [(winners[i], winners[i + 1]) for i in range(0, len(winners), 2)]


def simulate_knockout_match(home: Team, away: Team) -> KnockoutMatch:
    result = simulate_match(home, away)

    if result.home_goals != result.away_goals:
        winner = home if result.home_goals > result.away_goals else away
        return KnockoutMatch(
            home_team=home, away_team=away,
            home_goals=result.home_goals, away_goals=result.away_goals,
            winner=winner, penalties=False
        )

    # Draw: decide via penalty shootout weighted by Elo
    home_pen_prob = elo_expected_score(home.elo_rating, away.elo_rating)
    winner = home if random.random() < home_pen_prob else away
    return KnockoutMatch(
        home_team=home, away_team=away,
        home_goals=result.home_goals, away_goals=result.away_goals,
        winner=winner, penalties=True
    )


def simulate_round(matchups: list[tuple]) -> tuple[list[KnockoutMatch], list[Team]]:
    results = []
    winners = []
    for home, away in matchups:
        match = simulate_knockout_match(home, away)
        results.append(match)
        winners.append(match.winner)
    return results, winners


def simulate_tournament() -> TournamentResult:
    group_standings = {g: simulate_group(g, simulate_match) for g in 'ABCDEFGHIJKL'}
    qualified = get_qualified_teams(group_standings)

    r32, r16_teams = simulate_round(build_bracket(qualified))
    r16, qf_teams = simulate_round(pair_next_round(r16_teams))
    qf, sf_teams = simulate_round(pair_next_round(qf_teams))
    sf, final_teams = simulate_round(pair_next_round(sf_teams))
    final_results, champions = simulate_round([(final_teams[0], final_teams[1])])

    return TournamentResult(
        group_stage=group_standings,
        round_of_32=r32,
        round_of_16=r16,
        quarterfinals=qf,
        semifinals=sf,
        final=final_results[0],
        champion=champions[0]
    )
