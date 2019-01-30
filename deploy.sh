rsync -r . ubuntu@3.93.95.228:~/app --delete
ssh ubuntu@amazon 'cd ~/app/server && sudo docker-compose -f docker-compose.yml down && sudo docker-compose -f docker-compose.yml up -d'
