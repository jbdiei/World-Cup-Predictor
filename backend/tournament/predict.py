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
def expected_goals(home_elo:float, away_elo:float) -> float:
    elo_score = elo_expected_score(home_elo, away_elo)

    home_xg = 1.3 * 2 * elo_score
    away_xg = 1.3 *2 * (1-elo_score)
    
