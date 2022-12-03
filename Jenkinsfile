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
		
		stage("Performance test"){

			steps{
				echo 'Installing k6'
                sh 'sudo chmod +x setup_k6.sh'
                sh 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
				sh 'ls -a'
				sh "pwd"
                sh 'k6 run Performance_Test_Catchupb.js'
			}
		}

	}
}


