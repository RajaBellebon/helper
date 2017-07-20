# Dice Rolling Simulator

import random


user_input = raw_input("Select the number of dice faces: ")
number_of_roll = raw_input("Select the number of time the user wants to roll the dice: ")
def DiceValues(user_input):
    dicValue = 0
    dicRollList = []
    x = 0
    while x < int(number_of_roll):
        dicValue = random.randint(1,int(user_input))
        dicRollList.append(dicValue)
        x +=1
    return dicRollList
