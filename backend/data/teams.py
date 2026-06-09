from models.schemas import Team, GroupStanding


TEAMS: list[Team]=[
    Team(name="Australia", confederation="AFC", fifa_rank= 27,
          elo_rating= 1774, group="D"),

    Team(name="Iran", confederation="AFC", fifa_rank= 21,
          elo_rating= 1764, group="G"),

    Team(name="Iraq", confederation="AFC", fifa_rank= 57,
    elo_rating= 1608, group="I"),
    
    Team(name="Japan", confederation="AFC", fifa_rank= 18,
          elo_rating= 1906, group="F"),

    Team(name="Jordan", confederation="AFC", fifa_rank= 63,
          elo_rating= 1685, group="J"),

    Team(name="South Korea", confederation="AFC", fifa_rank= 25,
          elo_rating= 1756, group="A"),

    Team(name="Qatar", confederation="AFC", fifa_rank= 55,
          elo_rating= 1423, group="B"),

    Team(name="Saudi Arabia", confederation="AFC", fifa_rank= 61,
          elo_rating= 1556, group="H"),

    Team(name="Uzbekistan", confederation="AFC", fifa_rank= 50,
          elo_rating= 1718, group="K"),

    Team(name="Algeria", confederation="CAF", fifa_rank= 28,
          elo_rating= 1743, group="J"),
    
    Team(name="Cabo Verde", confederation="CAF", fifa_rank= 69,
          elo_rating= 1576, group="H"),

    Team(name="Congo DR", confederation="CAF", fifa_rank= 46,
          elo_rating= 1207, group="K"),

    Team(name="Cote d'Ivoire", confederation="CAF", fifa_rank= 34,
          elo_rating= 1676,group="E"),

    Team(name="Egypt", confederation="CAF", fifa_rank= 29,
          elo_rating= 1699, group="G"),

    Team(name="Ghana", confederation="CAF", fifa_rank= 74,
          elo_rating= 1510, group="L"),

    Team(name="Morocco", confederation="CAF", fifa_rank= 8,
          elo_rating= 1824, group="C"),

    Team(name="Senegal", confederation="CAF", fifa_rank= 14,
          elo_rating= 1867, group="I"),

    Team(name="South Africa", confederation="CAF", fifa_rank= 60,
          elo_rating= 1518, group="A"),

    Team(name="Tunisia", confederation="CAF", fifa_rank= 44,
          elo_rating= 1633, group="F"),
          
    Team(name="Canada", confederation="CONCACAF", fifa_rank= 30,
          elo_rating= 1793, group="B"),
    
    Team(name="USA", confederation="CONCACAF", fifa_rank= 16,
          elo_rating= 1733, group="D"),

    Team(name="Mexico", confederation="CONCACAF", fifa_rank= 15,
          elo_rating= 1867, group="A"),

    Team(name="Curacao", confederation="CONCACAF", fifa_rank= 82,
          elo_rating= 1433, group="E"),
    
    Team(name="Haiti", confederation="CONCACAF", fifa_rank= 83,
          elo_rating= 1532, group="C"),

    Team(name="Panama", confederation="CONCACAF", fifa_rank= 33,
          elo_rating= 1733, group="L"),

    Team(name="Argentina", confederation="CONMEBOL", fifa_rank= 3,
          elo_rating= 2113, group="J"),

    Team(name="Brazil", confederation="CONMEBOL", fifa_rank= 6,
          elo_rating= 1988, group="C"),

    Team(name="Colombia", confederation="CONMEBOL", fifa_rank= 13,
          elo_rating= 1977, group="K"),

    Team(name="Ecuador", confederation="CONMEBOL", fifa_rank= 23,
          elo_rating= 1935, group="E"),

    Team(name="Paraguay", confederation="CONMEBOL", fifa_rank= 40,
          elo_rating= 1832, group="D"),

    Team(name="Uruguay", confederation="CONMEBOL", fifa_rank= 17,
          elo_rating= 1892, group="H"),

    Team(name="New Zealand", confederation="OFC", fifa_rank= 85,
          elo_rating= 1585, group="G"),

    Team(name="Austria", confederation="UEFA", fifa_rank= 24,
          elo_rating= 1830, group="J"),

    Team(name="Belgium", confederation="UEFA", fifa_rank= 9,
          elo_rating= 1893, group="G"),

    Team(name="Bosnia", confederation="UEFA", fifa_rank= 65,
          elo_rating= 1595, group="B"),

    Team(name="Croatia", confederation="UEFA", fifa_rank= 11,
          elo_rating= 1911, group="L"),
          
    Team(name="Czechia", confederation="UEFA", fifa_rank= 41,
          elo_rating= 1740, group="A"),
          
    Team(name="England", confederation="UEFA", fifa_rank= 4,
          elo_rating= 2021, group="L"),
          
    Team(name="France", confederation="UEFA", fifa_rank= 1,
          elo_rating= 2063, group="I"),
          
    Team(name="Germany", confederation="UEFA", fifa_rank= 10,
          elo_rating= 1932, group="E"),
          
    Team(name="Netherlands", confederation="UEFA", fifa_rank= 7,
          elo_rating= 1948, group="F"),
          
    Team(name="Norway", confederation="UEFA", fifa_rank= 31,
          elo_rating= 1914, group="I"),

    Team(name="Portugal", confederation="UEFA", fifa_rank= 5,
          elo_rating= 1986, group="K"),

    Team(name="Scotland", confederation="UEFA", fifa_rank= 43,
          elo_rating= 1782, group="C"),
          
    Team(name="Spain", confederation="UEFA", fifa_rank= 2,
          elo_rating= 2155, group="H"),

    Team(name="Sweden", confederation="UEFA", fifa_rank= 38,
          elo_rating= 1712, group="F"),
          
    Team(name="Switzerland", confederation="UEFA", fifa_rank= 19,
          elo_rating= 1891, group="B"),
          
    Team(name="Turkey", confederation="UEFA", fifa_rank= 22,
          elo_rating= 1911, group="D"),
    
    
    
    ]

def get_teams_by_group(group: str) -> list[Team]:
    return [t for t in TEAMS if t.group == group]