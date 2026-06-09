from itertools import combinations
from models.schemas import Team, GroupStanding, MatchResult
from data.teams import get_teams_by_group


def simulate_group(group: str, predict_fn) -> list[GroupStanding]:
    teams = get_teams_by_group(group)
    standings = {team.name: GroupStanding(team=team, 
                                          played=0, 
                                          wins=0, 
                                          draws=0, 
                                          losses=0,
                                          goals_for=0, 
                                          goals_against=0)
                                            for team in teams}

    for home,away in combinations(teams, 2):
        result = predict_fn(home, away)
        update_standings(standings, result)
    return sort_standings(list(standings.values()))

def update_standings(standings: dict, result: MatchResult):
    homeStandings = standings[result.home_team.name]
    awayStandings = standings[result.away_team.name]

    homeStandings.played +=1
    homeStandings.goals_for +=result.home_goals
    homeStandings.goals_against +=result.away_goals

    awayStandings.played +=1
    awayStandings.goals_for +=result.away_goals
    awayStandings.goals_against +=result.home_goals

    if result.home_goals > result.away_goals:
        homeStandings.wins+=1
        awayStandings.losses+=1
    elif result.home_goals < result.away_goals:
        homeStandings.losses+=1
        awayStandings.wins +=1

    else:
        homeStandings.draws +=1
        awayStandings.draws +=1
    
    
    



 
   
def sort_standings(standings: list[GroupStanding]) -> list[GroupStanding]:
    return sorted(standings, key = lambda x:(x.points, x.goal_difference, x.goals_for, -x.team.fifa_rank),reverse=True)
