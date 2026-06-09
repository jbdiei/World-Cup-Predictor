# elo expected value is between teams helps caluclate lambda
#which is the expected goals scored for that matchup. 
#once you get those values, you can use this lambda to iterate 
#over k, the amount of goals for this matchup 
#and find the likelyhood of each k goals 

import math
import numpy as np
from models.schemas import Team, MatchResult

BASE_GOALS = 1.3

def elo_expected_score(home_elo: float, away_elo: float) -> float:
    return 1 / (1 + 10**((away_elo - home_elo) / 400))

#this is lambda
def expected_goals(home_elo:float, away_elo:float) -> tuple[float, float]:
    elo_score = elo_expected_score(home_elo, away_elo)

    home_xg = BASE_GOALS * 2 * elo_score
    away_xg = BASE_GOALS *2 * (1-elo_score)

    return (home_xg, away_xg)

def poisson(k: int, lam: float) -> float:
    return (math.exp(-lam) * (lam ** k)) / math.factorial(k)

def simulate_match(home: Team, away: Team) -> MatchResult:
    home_xg, away_xg = expected_goals(home.elo_rating, away.elo_rating)

    home_goals = int(np.random.poisson(home_xg))
    away_goals = int(np.random.poisson(away_xg))

    return MatchResult(home_team=home,
                        away_team=away,
                        home_goals=home_goals,
                        away_goals=away_goals)

def win_probabilities(home: Team, away: Team) -> dict:
    home_lam, away_lam = expected_goals(home.elo_rating, away.elo_rating)
    probs = {"home_win" : 0, "away_win": 0, "draw": 0}
    for i in range(11):
        for j in range(11):
            p = poisson(i,home_lam ) * poisson(j, away_lam)

            if i> j:
                probs["home_win"] +=p
            elif i<j:
                probs["away_win"] +=p
            else:
                probs["draw"]+=p
    return {
            home.name: round(probs["home_win"], 3),
            away.name: round(probs["home_win"], 3),
            "draw": round(probs["draw"], 3)
        }


    
