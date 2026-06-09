from pydantic import BaseModel, computed_field


class Team(BaseModel):
    name: str
    confederation: str
    fifa_rank: int
    elo_rating: float
    group: str

class GroupStanding(BaseModel):
    team: Team
    played: int
    wins: int
    draws: int
    losses: int 
    goals_for: int
    goals_against: int
    
    @computed_field
    @property
    def points(self) -> int:
        return (3 * self.wins) + self.draws #3w +1d
    
    @computed_field
    @property
    def goal_difference(self) -> int:
        return self.goals_for - self.goals_against

class MatchResult(BaseModel):
    home_team: Team
    away_team: Team
    home_goals: int
    away_goals: int