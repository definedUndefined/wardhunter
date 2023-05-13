# WardHunter Client

WardHunter is a Nodejs library for interacting with the Riot Games API. It is designed to be a simple and easy to use library for developers to use to create their own applications.

This is a school project for the french [CDA degree](https://www.banque.di.afpa.fr/EspaceEmployeursCandidatsActeurs/EGPResultat.aspx?ct=01281m03&type=t). It is not meant to be used in production.

## Installation

You first need to setup a postgresql database. You can use [supabase](https://supabase.com/) to do so.
I recommand to use the local version of supabase, you can find the instructions [here](https://supabase.com/docs/guides/local-development).

You can alternatively use a local postgresql database, with [docker](https://www.docker.com/) for example.

Copy this repository and install the dependencies.

```bash
git clone https://github.com/definedUndefined/wardhunter.git
cd wardhunter
npm i
```

Add environnement variables to your `.env` file.

```env
# riot api
RIOT_API_KEY=YOUR_RIOT_API_KEY

# postgresql
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
```

Make sure your database is running, then run the following command to create the tables.

```bash
npm run db:init
```

## Usage

You can start the server with the following command.

```bash
npm run dev
```

More information will be provided in the future.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
