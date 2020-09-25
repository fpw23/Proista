ROBOCOPY ..\..\API\dist .\app /MIR
COPY ..\..\API\package.json .\app
docker build --tag=fpw23/cevaportal-web:%1 .
docker tag fpw23/cevaportal-web:%1 fpw23/cevaportal-web:latest