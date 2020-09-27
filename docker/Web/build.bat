ROBOCOPY ..\..\packages\uidemo\dist .\app /MIR
COPY ..\..\packages\uidemo\package.json .\app
docker build --tag=fpw23/proista-uidemo:%1 .
docker tag fpw23/proista-uidemo:%1 fpw23/proista-uidemo:latest