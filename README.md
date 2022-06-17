<h1 align="center">
	 Camille's TypeScript Boilerplate 🥘
</h1>

<h3 align="center">
	This is the TypeScript base code that I use for all my open-source and private projects.
</h3>

---

I aim to update this boilerplate when I integrate new tools in my workflow.

If you are looking for my older boilerplate template, you can find it [here](https://github.com/clouedoc/typescript-boilerplate-archive).

## Features

- Parse your environment variables with [Zod](https://github.com/colinhacks/zod)
- [Loki](https://github.com/grafana/loki/) integration
- Update your packages with [ncu](https://github.com/raineorshine/npm-check-updates)
- Integrates an [oclif](https://github.com/oclif/oclif) CLI
- [Docker](https://www.docker.com/) support
  - Puppeteer-ready image integrated
  - ... and a basic Node-based one is included too.
- [GitPod](https://gitpod.io) support
- CI/CD with [GitHub Actions](https://docs.github.com/en/actions)
- Package patching thanks to [patch-package](https://github.com/ds300/patch-package)
- Witty ESLint configuration to keep your code clean
- Stay in the loop thanks to smart template updates

## Usage

```bash
pip install pipx && pipx ensurepath && . ~/.bashrc # pipx installation
pipx install copier # copier installation
# Actual template work
copier gh:clouedoc/typescript-boilerplate-evolved your_new_project
```

### Fetching updates

This template will frequently get updated over time.

To fetch updates, run the following commands:

```bash
git status # should be clean
copier update # this will fetch the latest release
# If you want to stay on the edge:
# copier update --vcs-ref=HEAD
```

**Do not manually edit the .copier-answers.yml file. This will confuse the smart update algorithm.**

You may find `*.ref` files that you need to resolve manually.

## License

This code is released under the MIT License

## Contributing

Contributions are what make the open source community such an amazing place to be, learn, inspire, and create. Any contributions you make are greatly appreciated!

## References

- [Jinja templates reference](https://jinja.palletsprojects.com/en/3.1.x/templates/#list-of-control-structures)
- [Copier documentation](https://copier.readthedocs.io/en/stable/)
