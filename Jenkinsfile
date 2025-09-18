pipeline {
    agent any

    tools {
        nodejs 'Node16'
    }

    stages {
        stage('Clonar Repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/usuario/seu-repositorio.git'
            }
        }

        stage('Instalar Dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Rodar Testes Cypress') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing: false,
                keepAll: true,
                reportDir: 'cypress/results',
                reportFiles: 'mochawesome.html',
                reportName: 'Relatório Cypress'
            ])
        }
        success {
            echo '✅ Testes executados com sucesso!'
        }
        failure {
            echo '❌ Testes falharam!'
        }
    }
}
