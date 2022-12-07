pipeline {

	agent any

	stages {

        stage("Get repo"){

			steps {
				sh "rm -rf ${WORKSPACE}/dinnerwithfriends.api"
				sh "git clone https://github.com/workshopapps/dinnerwithfriends.api.git"
			}
		}

		stage("build backend"){

			steps {
				sh "sudo npm i --force"
				sh "echo export APPOPTICS_SERVICE_KEY=6rSOjDIF_AyC22uWDjuTH4ur_Ah9PHVxJq6MZ33-D7KeSe5nJDkG5DNgGvLTo-wndLtkggQ:catchup-api"
				sh "ls -la"
			}
        }

		stage("deploy") {
		
			steps {
                sh "sudo cp -rf ${WORKSPACE}/dinnerwithfriends.api/ /home/johnoni/"
				sh "sudo cp -r /home/johnoni/dinnerwithfriends_env/app.env /home/johnoni/dinnerwithfriends.api/.env"
				sh "sudo systemctl restart nickstersz-backend.service"
            }
	    }
	}
}


