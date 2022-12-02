pipeline {

	agent any

	stages {

        stage("Get repo"){

			steps {
				sh "rm -rf ${WORKSPACE}/dinnerwithfriends.api"
				sh "git clone https://github.com/workshopapps/dinnerwithfriends.api.git"
				sh "sudo cp -r ${WORKSPACE}/dinnerwithfriends.api /home/johnoni/dinnerwithfriends.api"
				sh "sudo cp -r /home/johnoni/dinnerwithfriends_env/app.env /home/johnoni/dinnerwithfriends.api/.env"
				sh "sudo ls -la /home/johnoni/dinnerwithfriends.api/"

			}
		}

		stage("build backend"){

			steps {
				sh "cd dinnerwithfriends.api"
				sh "cd dinnerwithfriends.api && npm i --force && CI=false npm start"
			}
        }

		stage("deploy") {
		
			steps {
                // sh "sudo cp -rf ${WORKSPACE}/dinnerwithfriends.api/* /home/johnoni/dinnerwithfriends.api/"
				sh "sudo systemctl restart nickstersz-backend.service"
            }
	    }
	}
}

