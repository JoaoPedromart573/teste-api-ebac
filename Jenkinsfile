pipeline {
    agent any

    tools {
        nodejs "NodeJS"   // Nome da instalação do Node configurada no Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/seu-usuario/seu-repositorio.git'
            }
        }

        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Rodar Testes API') {
            steps {
                sh 'npm run test:api'
            }
        }

        stage('Rodar Testes Web') {
            steps {
                sh 'npm run test:web'
            }
        }
    }

    post {
        always {
            junit 'reports/**/*.xml'  // Se estiver usando Mocha + mochawesome ou Jest JUnit
            archiveArtifacts artifacts: 'reports/**/*.*', allowEmptyArchive: true
        }
    }
}
