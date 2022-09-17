PROJECT=demo
PROFILE=sandbox
CURRENT_REGION=eu-west-1
AWS_STACK="*"
CDK_BIN=./node_modules/.bin/cdk
AWS_DCL_TAG=4
AWS_APP_ID_TAG=SVC02670
AWS_ENV_TAG=DEV

ifdef AWS_PROFILE
	PROFILE:=$(AWS_PROFILE)
endif

ifdef ENV_TAG
	AWS_ENV_TAG:=$(ENV_TAG)
endif

ifdef PROJECT_PREFIX
	PROJECT:=$(PROJECT_PREFIX)
endif

ifdef AWS_REGION
	CURRENT_REGION:=$(AWS_REGION)
endif

ifdef STACK_NAME
	AWS_STACK:=$(STACK_NAME)
endif

build:

clean:

format:

deploy:
	$(CDK_BIN) deploy --profile $(PROFILE) --require-approval never \
		-c Project=$(PROJECT) -c CurrentRegion=$(CURRENT_REGION) -c CurrentEnv=$(ENV_LABEL) \
		-t t_environment=$(AWS_ENV_TAG) -t t_AppID=$(AWS_APP_ID_TAG) -t t_dcl=$(AWS_DCL_TAG) $(AWS_STACK)

hotswap:
	$(CDK_BIN) deploy --profile $(PROFILE) --require-approval never --hotswap --no-rollback \
		-c Project=$(PROJECT) -c CurrentRegion=$(CURRENT_REGION) -c CurrentEnv=$(ENV_LABEL) \
		-t t_environment=$(AWS_ENV_TAG) -t t_AppID=$(AWS_APP_ID_TAG) -t t_dcl=$(AWS_DCL_TAG) $(AWS_STACK)

delete:
	$(CDK_BIN) destroy --profile $(PROFILE) \
        -c Project=$(PROJECT) -c CurrentRegion=$(CURRENT_REGION) -c CurrentEnv=$(ENV_LABEL) $(AWS_STACK)

diff:
	$(CDK_BIN) diff --profile $(PROFILE) \
	    -c Project=$(PROJECT) -c CurrentRegion=$(CURRENT_REGION) -c CurrentEnv=$(ENV_LABEL) $(AWS_STACK)

synth:
	$(CDK_BIN) synth --profile $(PROFILE) \
	    -c Project=$(PROJECT) -c CurrentRegion=$(CURRENT_REGION) -c CurrentEnv=$(ENV_LABEL) \
		-t t_environment=$(AWS_ENV_TAG) -t t_AppID=$(AWS_APP_ID_TAG) -t t_dcl=$(AWS_DCL_TAG) $(AWS_STACK)

list:
	$(CDK_BIN) list --profile $(PROFILE) \
		-c Project=$(PROJECT) -c CurrentRegion=$(CURRENT_REGION) -c CurrentEnv=$(ENV_LABEL)
