def reaction_time_score(
    average_reaction_time: float,
) -> float:

    if average_reaction_time < 500:
        return 100

    if average_reaction_time < 700:
        return 80

    if average_reaction_time < 900:
        return 60

    if average_reaction_time < 1100:
        return 40

    return 20

def calculate_overall_score(assessment):

    memory_score = assessment.memory.accuracy

    attention_score = assessment.attention.accuracy

    reaction_score = reaction_time_score(
        assessment.reactionTime.averageReactionTime
    )

    pattern_score = assessment.pattern.accuracy

    overall_score = (
        memory_score
        + attention_score
        + reaction_score
        + pattern_score
    ) / 4

    return round(overall_score, 2)