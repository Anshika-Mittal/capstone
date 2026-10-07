import numpy as np


def hjorth_parameters(signal):

    activity = np.var(signal)

    if activity == 0:
        return {
            "hjorth_activity": 0.0,
            "hjorth_mobility": 0.0,
            "hjorth_complexity": 0.0
        }

    first_derivative = np.diff(signal)
    second_derivative = np.diff(first_derivative)

    variance_derivative = np.var(
        first_derivative
    )

    variance_second = np.var(
        second_derivative
    )

    if variance_derivative == 0:
        return {
            "hjorth_activity": activity,
            "hjorth_mobility": 0.0,
            "hjorth_complexity": 0.0
        }

    mobility = np.sqrt(
        variance_derivative / activity
    )

    mobility_derivative = np.sqrt(
        variance_second / variance_derivative
    )

    complexity = (
        mobility_derivative / mobility
        if mobility != 0
        else 0.0
    )

    return {
        "hjorth_activity": activity,
        "hjorth_mobility": mobility,
        "hjorth_complexity": complexity
    }