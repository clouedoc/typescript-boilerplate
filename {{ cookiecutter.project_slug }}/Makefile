.PHONY: docker docker-bash

docker:
	DOCKER_BUILDKIT=1 docker build -t {{ cookiecutter.docker_image_name }} .

docker-bash: docker
	docker run --rm -it {{ cookiecutter.docker_image_name }} /bin/bash