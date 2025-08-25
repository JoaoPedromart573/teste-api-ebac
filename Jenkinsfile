pipeline {
    agent any

    tools {
        nodejs "nodejs-lts"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/seu-repositorio.git'
            }
        }

        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Subir Serverest') {
            steps {
                sh 'nohup npm run iniciar &'
                sh 'sleep 5'
            }
        }

        stage('Rodar Testes') {
            steps {
                sh 'npm run cy:run'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
        }
    }
}
