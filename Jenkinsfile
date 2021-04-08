#!/usr/bin/env groovy

@Library('neb0t-slack-notifier-jenkins-sl') _

def notifier = new org.gradiant.jenkins.slack.SlackNotifier()

pipeline {
    agent {
        node {
            label 'callakofa-dev'
        }
    }
    parameters {
        string(defaultValue: '', description: 'Specify branch name to build', name: 'BRANCH_NAME')
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
    triggers {
        GenericTrigger(
                genericVariables: [
                        [key: 'BRANCH_NAME', value: '$.push.changes[0].new.name']
                ],
                causeString: 'Started by Bitbucket push to ${BRANCH_NAME}',
                token: 'PHIOGY7yh7tgy011u89',
                printContributedVariables: false,
                printPostContent: false,
                silentResponse: false,
                regexpFilterExpression: '^master$',
                regexpFilterText: '${BRANCH_NAME}'

        )
    }
    stages {
        stage('🚩 Checkout') {
            steps {
                script {
                    echo 'Cleanup...'
                    cleanWs()
                    echo "BRANCH_NAME=" + BRANCH_NAME
                    if (BRANCH_NAME == null || BRANCH_NAME == "") {
                        echo "This build is triggered manually, using branch name specified in BRANCH_NAME build parameter"
                        BRANCH_NAME = params.BRANCH_NAME
                    }
                    checkout([$class: 'GitSCM', branches: [[name: "*/${BRANCH_NAME}"]], doGenerateSubmoduleConfigurations: false, submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'gitlab_neb0t_integration', url: "${GIT_REPO}"]]])
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    bitbucketStatusNotify(buildState: 'INPROGRESS', commitId: GIT_COMMIT, repoSlug: REPO_SLUG)
                }
                withEnv(["SLACK_CHANNEL=${SLACK_CHANNEL}", "SLACK_DOMAIN=${SLACK_DOMAIN}", "SLACK_CREDENTIALS=${SLACK_CREDENTIALS}"]) {
                    script {
                        notifier.notifyStart()
                    }
                }
            }
        }
        stage('🔧 Prepare Build Version') {
            steps {
                script {
                    GIT_AUTHOR = sh(
                            script: 'git log -1 --pretty=format:%an',
                            returnStdout: true
                    ).trim()
                    GIT_REVISION = sh(
                            script: 'git rev-parse --short HEAD',
                            returnStdout: true
                    ).trim()
                    GIT_REVISION_NUMBER = sh(
                            script: 'git rev-list --count HEAD',
                            returnStdout: true
                    ).trim()
                    currentBuild.displayName = "1.0." + "${GIT_REVISION_NUMBER}" + "." + "${BUILD_NUMBER}"
                    currentBuild.description = "Branch: ${BRANCH_NAME}" + " (Last commit: ${GIT_REVISION} author: ${GIT_AUTHOR})"
                }
            }
        }
        stage('Build FRONTEND') {
            steps {
                sh '''
                    docker-compose build --no-cache
                '''
            }
        }
        stage('Run FRONTEND') {
            steps {
                sh '''
                    docker-compose up -d --force-recreate callakofa-frontend
                    docker system prune -f
                '''
            }
        }
        stage('🔖 Tag git') {
            steps {
                script {
                    echo "Creating Git tag 1.0.${GIT_REVISION_NUMBER}.${BUILD_NUMBER}"
                    echo "Command: git tag 1.${GIT_REVISION_NUMBER}.${BUILD_NUMBER}"
                    sshagent(credentials: ['gitlab_neb0t_integration']) {
                        sh("git reset --hard")
                        sh("git tag 1.0.${GIT_REVISION_NUMBER}.${BUILD_NUMBER}")
                        sh("git push --tags")
                    }
                }
            }
        }
    }
    post {
        failure {
            echo 'Build failed! 👿'
            bitbucketStatusNotify(buildState: 'FAILED', commitId: GIT_COMMIT, repoSlug: REPO_SLUG)
            withEnv(["SLACK_CHANNEL=${SLACK_CHANNEL}", "SLACK_DOMAIN=${SLACK_DOMAIN}", "SLACK_CREDENTIALS=${SLACK_CREDENTIALS}"]) {
                script {
                    notifier.notifyResult()
                }
            }
        }
        success {
            bitbucketStatusNotify(buildState: 'SUCCESSFUL', commitId: GIT_COMMIT, repoSlug: REPO_SLUG)
            withEnv(["SLACK_CHANNEL=${SLACK_CHANNEL}", "SLACK_DOMAIN=${SLACK_DOMAIN}", "SLACK_CREDENTIALS=${SLACK_CREDENTIALS}"]) {
                script {
                    notifier.notifyResult()
                }
            }
            echo 'Success! 😇'
        }
    }
}