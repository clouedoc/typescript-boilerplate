<h1 align="center">
 {{ cookiecutter.project_name }} {{ cookiecutter.project_emoji }}
</h1>

<h3 align="center">
	{{ cookiecutter.project_short_description }}
</h3>

## Installation

```bash
git clone {{ cookiecutter.project_url }}.git
cd {{ cookiecutter.project_slug }}
yarn install && yarn link
{{ cookiecutter.binary_name }} # see CLI usage documentation below
```

## Development

```bash
git clone {{ cookiecutter.project_url }}.git
cd {{ cookiecutter.project_slug }}
yarn install

# Here are the available scripts:
yarn ncu # check for package updates
yarn sort # sort package.json
yarn detect-circular-dependencies # detect circular deps with Madge
yarn lint # run ESLint
yarn prettier # prettify all files
yarn test # run Jest tests
yarn dev # run Nodemon (build everything!)
```

## CLI

### Usage

<!-- usage -->
<!-- usagestop -->

## Commands

<!-- commands -->
<!-- commandsstop -->

## License

This project is published under the {{ cookiecutter.project_license }} license.

## Contributing

Contributions are what make the open source community such an amazing place to be, learn, inspire, and create. Any contributions you make are greatly appreciated!
