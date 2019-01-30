MAS First Programming Assignment
By Michael Lin, Kevin Cai

Instructions to run backend (native)
1. Install nodejs 8.0 or higher, MongoDB, and NGINX
2. Configure NGINX with config in config.d/dev/default.conf
3. clone the repository
4. cd into the folder containing package.json
5. run 'npm install'
6. run 'npm start'

Instructions to run backend (Docker)
1. Install Docker
2. clone the repository
3. cd into server directory
4. run 'docker-compose up -d'
5. Server will now be running on localhost:80 (reverse proxy) and localhost:8888 (nodejs api)

Instructions to run app
1. download expo on mobile device
2. in the expo web portal, click "send linke with email/SMS..." This will send a link to your phone that will open the application in expo
3. open the link on your device
