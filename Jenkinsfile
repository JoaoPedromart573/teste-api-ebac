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

        stage('Testes Web') {
            steps {
                sh 'npx cypress run --spec "cypress/e2e/web/**/*.cy.js"'
            }
        }

        stage('Testes API') {
            steps {
                sh 'npx cypress run --spec "cypress/e2e/api/**/*.cy.js"'
            }
        }
    }

    post {
        always {
            junit 'cypress/results/*.xml' 
            archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
        }
    }
}
