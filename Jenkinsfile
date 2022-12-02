pipeline {

	agent any

	stages {

        stage("Get repo"){

			steps {
				sh "rm -rf ${WORKSPACE}/dinnerwithfriends.api"
				sh "git clone https://github.com/workshopapps/dinnerwithfriends.api.git"
				sh "sudo cp -r ${WORKSPACE}/dinnerwithfriends.api /home/johnoni/dinnerwithfriends.api"
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
                sh "sudo cp -rf ${WORKSPACE}/dinnerwithfriends.api/* /home/johnoni/dinnerwithfriends.api/"
				sh "sudo cp /home/johnoni/dinnerwithfriends_env/.env /home/johnoni/dinnerwithfriends.api/"
				sh "sudo systemctl restart nickstersz-backend.service"

                // sh "sudo serve -s /home/johnoni/dinnerwithfriends.web/build -p 3999"
            }
			
	    }
	}
}

