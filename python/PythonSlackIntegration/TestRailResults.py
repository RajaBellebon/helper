import sys
sys.path.append('/starterbot/Lib/site-packages')
import os
import time
import requests
from slackclient import SlackClient
from testrail import *

# settings
project_dict = {'Consumer Site': '1', 'Agent Admin': '2','Domain SEO': '5', 'Mobile Site': '6', 'Find An Agent': '10', 'Digital Data': '11'}
client = APIClient('https://domainau.testrail.net/')
client.user = 'test-emails3@domain.com.au'
client.password = 'Perfect123'

# starterbot's ID as an environment variable
BOT_ID = 'U2QK6K08J'

# constants
AT_BOT = "<@" + BOT_ID + ">:"
EXAMPLE_COMMAND = "do"

# instantiate Slack & Twilio clients
slack_client = SlackClient('xoxb-92652646290-HlpbFnWom59Zxt58XaW2Wo8F')


def handle_command(command, channel):
    """
        Receives commands directed at the bot and determines if they
        are valid commands. If so, then acts on the commands. If not,
        returns back what it needs for clarification.
    """
    response = "Not sure what you mean. Use the *" + EXAMPLE_COMMAND + \
               "* command with numbers, delimited by spaces."
    if command.startswith(EXAMPLE_COMMAND):
        response = "Sure...write some more code then I can do that!"
    slack_client.api_call("chat.postMessage", channel=channel,
                          text=response, as_user=True)


def parse_slack_output(slack_rtm_output):
    """
        The Slack Real Time Messaging API is an events firehose.
        this parsing function returns None unless a message is
        directed at the Bot, based on its ID.
    """
    output_list = slack_rtm_output
    if output_list and len(output_list) > 0:
        for output in output_list:
            if output and 'text' in output and AT_BOT in output['text']:
                # return text after the @ mention, whitespace removed
                return output['text'].split(AT_BOT)[1].strip().lower(), \
                       output['channel']
    return None, None

def list_channels():
    channels_call = slack_client.api_call("channels.list")
    if channels_call.get('ok'):
        return channels_call['channels']
    return None



def send_message(channel_id, message):
    slack_client.api_call(
        "chat.postMessage",
        channel=channel_id,
        text=message,
        username='TestRail',
        icon_emoji=':testrail:'
    )

    
def get_results():
    new_results = ''
    for project in project_dict:
        runs = client.send_get('get_runs/' + project_dict[project])
        run = runs[0]
        new_result = '''
                    \n_*%s*_ 
                    *Run Name*: %s
                    *Total*: %s
                    *Passed*: %s
                    *Failed*: %s
                    *Blocked*: %s                   
                    *Link*: %s
                    \n
                    ''' %( project, str(run['name']), str(run['passed_count'] + run['failed_count'] + run['blocked_count']), str(run['passed_count']), str(run['failed_count']), str(run['blocked_count']), str(run['url']) )
                    
        new_results += new_result
    return new_results


def get_failed_tests():
    new_results = ''
    for project in project_dict:
        runs = client.send_get('get_runs/' + project_dict[project])
        run = runs[0]      
    return new_results
    
if __name__ == "__main__":
    #READ_WEBSOCKET_DELAY = 1 # 1 second delay between reading from firehose
    if slack_client.rtm_connect():
        print("StarterBot connected and running!")
        command, channel = parse_slack_output(slack_client.rtm_read())
        if command and channel:
            handle_command(command, channel)
        #time.sleep(READ_WEBSOCKET_DELAY)
        channels = list_channels()
        results = get_results()
        message = send_message('C2QJFRUU8', results) 

    else:
        print("Connection failed. Invalid Slack token or bot ID?")
