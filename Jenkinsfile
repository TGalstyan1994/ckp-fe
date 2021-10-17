#!/usr/bin/env groovy

@Library('jenkins-shared-libraries') _

pipeline {
    agent {
        node {
            label 'callakofa-dev'
            customWorkspace '/home/deployer/workspace/CKP-FE-PIPELINE'
        }
    }
    environment {
        PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
        // GIT VARIABLES
        REPO_SLUG = "ckp-fe"
        GIT_REPO = 'git@bitbucket.org:rocketechteam/ckp-fe.git'
        // BUILD VARIABLES
        PROJECT_NAME = 'callakofa-frontend'
        PROJECT_FOLDER = "$WORKSPACE"
        SLACK_CHANNEL = 'project-calla-kofa-platfrom'
        SLACK_DOMAIN = 'rocketech-soft'
        SLACK_CREDENTIALS = 'rocketech-soft-slack-credentials-id'
        NOTIFY_SUCCESS = true
        CHANGE_LIST = true
        TEST_SUMMARY = false
    }
    options {
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '3', artifactNumToKeepStr: '3'))
        disableConcurrentBuilds()
    }
    stages {
        stage('🔧 Prepare Build Version') {
            agent {
                node {
                    label 'master'
                }
            }
            steps {
                script {
                    prepareBuildVersion()
                }
                stash name: 'src', includes: '**', excludes: '**/.git,**/.git/**'
            }
        }
        stage('Build FRONTEND') {
            when {
                beforeAgent true
                branch 'dev'
            }
            steps {
                sh '''
                    echo "DOMAIN=fe.ckp.rocketech.net" > .env
                    echo "NEXT_PUBLIC_API=https://be.ckp.rocketech.net" >> .env

                    docker-compose build --no-cache
                '''
            }
        }
        stage('Run FRONTEND') {
            when {
                beforeAgent true
                branch 'dev'
            }
            steps {
                sh '''
                    docker-compose up -d --force-recreate callakofa-frontend
                    docker system prune -f
                '''
            }
        }
        stage('🔖 Tag git') {
            agent {
                node {
                    label 'master'
                }
            }
            steps {
                script {
                    gitTagBuild('bitbucket-ssh-key')
                }
            }
        }
    }
    post {
        failure {
            echo 'Build failed! 👿'
        }
        success {
            echo 'Success! 😇'
        }
        always {
            cleanWs()
        }
    }
}