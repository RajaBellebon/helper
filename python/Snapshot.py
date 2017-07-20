# The necessary imports for this application
import json
import requests

from time import sleep

# The URL of the Extractions Endpoint
url = 'https://api.dowjones.com/alpha/extractions/documents'

#Our prompts to be inserted into our query.
prompt = "> "

print("What are you searching for?")
search_term = raw_input(prompt)

print("What is your article limit?")
limit = raw_input(prompt)

request_body = {
  "query": {
    "where": "body contains '" + search_term + "' AND language_code='en' AND publication_date >= '2015-01-01 00:00'",
    "limit": str(limit)
  }
}

# Call the endpoint with the given query
print("Creating the extraction: " + json.dumps(request_body))
response = requests.post(url, data=json.dumps(request_body), headers={'content-type': 'application/json', 'user-key': 'USER_KEY'})
print(response.text)

# Verify the response from creating an extraction is OK
if response.status_code == 201:
    extraction = response.json()
    print(extraction)
    print("Extraction Created. Job ID: " + extraction['data']['id'])
    self_link = extraction["links"]["self"]
    print "Checking state of the job."

    while True:
        # We now call the second endpoint, which will tell us if the extraction is ready.
        status_response = requests.get(self_link, headers={'content-type': 'application/json', 'user-key': 'USER_KEY'})

        # Verify the response from the self_link is OK
        if status_response.status_code == 200:
            # There is an edge case where the job does not have a current_state yet. If current_state
            # does not yet exist in the response, we will sleep for 10 seconds
            status = status_response.json()

            if 'currentState' in status['data']['attributes']:
                currentState = status['data']['attributes']['currentState']
                print("Current state is: " + currentState)

                # Job is still running, Sleep for 10 seconds
                if currentState == "JOB_STATE_RUNNING":
                    print("Sleeping for 10 seconds...Job state running")
                    sleep(10)

                elif currentState == "JOB_QUEUED":
                    print("Sleeping for 10 seconds...Job queued")
                    sleep(10)

                elif currentState == "JOB_CREATED":
                    print("Sleeping for 10 seconds...Job created")
                    sleep(10)

                else:
                    # If currentState is JOB_STATE_DONE then everything completed successfully
                    if currentState == "JOB_STATE_DONE":
                        print("Job completed successfully")
                        print("Data is available here: " + status["data"]["attributes"]["destination"])
                        print("To list the contents of the extraction use: gsutil ls " + status["data"]["attributes"]["destination"])

                    # job has another state that means it was not successful.
                    else:
                        print("An error occurred with the job. Final state is: " + currentState)

                    break
            else:
                print("Sleeping for 10 seconds...")
                sleep(10)

        else:
            print("ERROR: an error occurred getting the details for the extraction: " + status_response.text)

else:
    print("ERROR: An error occurred creating an extraction: " + response.text)
