<h1 align="center">
	 Camille's TypeScript Boilerplate 🥘
</h1>

<h3 align="center">
	This is the TypeScript base code that I use for all my open-source and private projects.
</h3>

---

I aim to update this boilerplate when I integrate new tools in my workflow.

If you are looking for my older boilerplate template, you can find it [here](https://github.com/clouedoc/typescript-boilerplate-old).

## Features

- Parse your environment variables with [Zod](https://github.com/colinhacks/zod)
- Collect and extract metrics from your logs using [Loki](https://github.com/grafana/loki/)
- Update your packages with [ncu](https://github.com/raineorshine/npm-check-updates)
- Build a beautiful CLI UX with [oclif](https://github.com/oclif/oclif) CLI
- Build reusable [Docker](https://www.docker.com/) images
  - Puppeteer-ready image integrated
  - ... and a lightweight Node-based one is included too.
- containerized development thanks to DevContainers
- CI with [GitHub Actions](https://docs.github.com/en/actions)
- CD with Kubernetes and ArgoCD
- Package patching thanks to [patch-package](https://github.com/ds300/patch-package)
- Witty ESLint configuration to keep your code clean
- Stay in the loop thanks to smart template updates

## Usage

```bash
pip install pipx && pipx ensurepath && . ~/.bashrc # pipx installation
pipx install copier # copier installation

copier gh:clouedoc/typescript-boilerplate-evolved your_new_project

cd your_new_project
yarn install && yarn build
yarn dev # all good, start programming now!
```

### Fetching updates

To apply the latest version of this boilerplate to your project, run the following commands:

```bash
git status # should be clean
copier update # this will fetch the latest release
# If you want to stay on the edge:
# copier update --vcs-ref=HEAD
```

**Do not manually edit the .copier-answers.yml file. This will confuse Copier's update algorithm.**

You may find `*.ref` files that you need to resolve manually.

## License

This code is released under the MIT License

## Contributing

Contributions are what make the open source community such an amazing place to be, learn, inspire, and create. Any contributions you make are greatly appreciated!

## References

- [Jinja templates reference](https://jinja.palletsprojects.com/en/3.1.x/templates/#list-of-control-structures)
- [Copier documentation](https://copier.readthedocs.io/en/stable/)
