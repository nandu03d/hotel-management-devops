pipeline {

    agent any

    environment {
        BACKEND_IMAGE  = "hotel-backend:v3"
        FRONTEND_IMAGE = "hotel-frontend:v3"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '======================================'
                echo 'CHECKOUT'
                echo '======================================'

                git branch: 'master',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/nandu03d/hotel-management-devops.git'
            }
        }

        stage('Verify Files') {
            steps {
                sh '''
                    echo "======================================"
                    echo "PROJECT FILES"
                    echo "======================================"

                    pwd
                    ls -la

                    echo "Backend:"
                    ls -la backend

                    echo "Frontend:"
                    ls -la frontend

                    echo "Docker Compose:"
                    ls -la docker-compose.yml
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                    echo "======================================"
                    echo "BUILDING BACKEND"
                    echo "======================================"

                    cd backend

                    chmod +x gradlew

                    ./gradlew clean build -x test
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    echo "======================================"
                    echo "BUILDING DOCKER IMAGES"
                    echo "======================================"

                    docker build -t ${BACKEND_IMAGE} ./backend

                    docker build -t ${FRONTEND_IMAGE} ./frontend

                    echo "Docker images created:"
                    docker images | grep hotel-
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "======================================"
                    echo "DEPLOYMENT"
                    echo "======================================"

                    docker compose down --remove-orphans || true

                    docker compose up -d

                    echo "Application containers started."

                    docker compose ps
                '''
            }
        }

        stage('Wait for Application') {
            steps {
                sh '''
                    echo "======================================"
                    echo "WAITING FOR BACKEND"
                    echo "======================================"

                    MAX_RETRIES=30
                    RETRY_COUNT=0

                    until curl -sf http://localhost:8080/api/dashboard > /tmp/backend-health.json
                    do
                        RETRY_COUNT=$((RETRY_COUNT + 1))

                        echo "Backend is not ready yet. Attempt ${RETRY_COUNT}/${MAX_RETRIES}"

                        if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
                            echo "Backend failed to become ready."

                            echo "Backend container logs:"
                            docker compose logs backend --tail 100

                            exit 1
                        fi

                        sleep 5
                    done

                    echo "Backend is ready!"

                    cat /tmp/backend-health.json
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    echo "======================================"
                    echo "CONTAINER STATUS"
                    echo "======================================"

                    docker compose ps

                    echo "======================================"
                    echo "BACKEND HEALTH CHECK"
                    echo "======================================"

                    curl -f http://localhost:8080/api/dashboard

                    echo
                    echo "======================================"
                    echo "FRONTEND CHECK"
                    echo "======================================"

                    curl -f http://localhost:3000

                    echo
                    echo "Application verification successful."
                '''
            }
        }
    }

    post {

        success {
            echo '''
======================================
PIPELINE SUCCESSFUL
======================================
Application built and deployed successfully!
Backend:  http://localhost:8080
Frontend: http://localhost:3000
======================================
'''
        }

        failure {
            echo '''
======================================
PIPELINE FAILED
======================================
Check the Jenkins console output.
======================================
'''
        }

        always {
            echo 'Jenkins pipeline execution completed.'
        }
    }
}
