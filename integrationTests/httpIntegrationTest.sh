# Create Azure resource group
sls deploy > deploy-output.txt

# TODO - make assertions on output

# Invoke created function app
sls invoke -f hello -d '{"name": "Azure"}' > invoke-output.txt

# TODO - make assertions on output

# Clean up generated resource group
sls remove > remove-output.txt

# TODO - make assertions on output
