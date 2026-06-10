from fastapi import APIRouter, HTTPException, Query
from data.teams import get_teams_by_group, TEAMS
from tournament.predict import win_probabilities, simulate_match
from tournament.group_stage import simulate_group
from tournament.knockout import simulate_tournament

# GET  /groups                  → return all 12 groups with their teams
# GET  /predict/{home}/{away}   → win probabilities for two teams by name
# POST /simulate/group/{group}  → simulate a full group, return standings

router = APIRouter()

@router.get("/groups")
def get_groups():
    return {group: get_teams_by_group(group) for group in "ABCDEFGHIJKL" }

@router.get("/predict/{home}/{away}")
def get_prediction(home: str, away: str) -> dict:
    home_team = next((t for t in TEAMS if t.name == home), None)
    away_team = next((t for t in TEAMS if t.name == away), None)
    if not home_team or not away_team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    return win_probabilities(home_team, away_team)

        

@router.post("/simulate/group/{group}")
def post_simulation(group: str):
    return simulate_group(group.upper(), simulate_match)

@router.post("/simulate/tournament")
def post_tournament():
    from tournament.knockout import simulate_tournament
    return simulate_tournament()

@router.post("/simulate/odds")
def post_odds(n: int = Query(default=1000, ge=1, le=10000)):
    count = {}
    for _ in range(n):
        result = simulate_tournament()
        name = result.champion.name
        count[name] = count.get(name,0)+1
    return {name: round(count/n, 4) for name, count in sorted(count.items(), key=lambda x: -x[1])}