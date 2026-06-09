from fastapi import APIRouter, HTTPException
from data.teams import get_teams_by_group, TEAMS
from tournament.predict import win_probabilities, simulate_match
from tournament.group_stage import simulate_group


