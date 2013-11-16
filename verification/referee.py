from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import checkers

from tests import TESTS

ACTIONS = {
    "L": (0, -1),
    "R": (0, 1),
    "U": (-1, 0),
    "D": (1, 0),
    "B": (0, 0)
}


def checker(answer, route):
    field, max_time = answer
    max_row, max_col = len(field), len(field[0])
    if not isinstance(route, str):
        return False, "The route is a string."
    s_row, s_col = 0, 0
    total_time = 0
    hold_box = True
    for step in route:

        if step not in ACTIONS.keys():
            return False, "Unknown action {0}".format(step)
        if step == "B":
            if hold_box:
                if field[s_row][s_col] == "B":
                    hold_box = False
                    total_time += 1
                    continue
                else:
                    return False, "Stephan broke the cargo".format(step)
            else:
                if field[s_row][s_col] == "B":
                    hold_box = True
                total_time += 1
                continue
        n_row, n_col = s_row + ACTIONS[step][0], s_col + ACTIONS[step][1],
        total_time += 2 if hold_box else 1
        if 0 > n_row or n_row >= max_row or 0 > n_col or n_row >= max_col:
            return False, "We've lost Stephan."
        if field[n_row][n_col] == "W":
            return False, "Stephan fell in water."
        s_row, s_col = n_row, n_col
        if field[s_row][s_col] == "E" and hold_box:
            if total_time <= max_time:
                return True, "Win"
            else:
                break
    if total_time >= max_time:
        return False, "You can deliver the cargo faster."
    return False, "The cargo is not delivered"


api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        checker=checker).on_ready)
