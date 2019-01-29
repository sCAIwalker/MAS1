rsync -r . ubuntu@3.93.95.228:~/app
ssh ubuntu@amazon 'cd ~/app/server && sudo docker-compose down && sudo docker-compose up -d'
