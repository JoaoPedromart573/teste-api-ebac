pipeline {
    agent any

    tools {
        nodejs 'Node16'   // Configure no Jenkins (Global Tool Configuration)
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
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            junit 'cypress/results/*.xml' // se você configurar reporter JUnit no cypress.config.js
        }
        success {
            echo '✅ Testes executados com sucesso!'
        }
        failure {
            echo '❌ Testes falharam!'
        }
    }
}
