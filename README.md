# Example Monolith Web App

Example Express Web server with RESTful APIs and a React front end.

## Running The Apps Locally

* API

    This will run Express locally and it will reload when files change
    ```
    cd api
    npm run-script start-local
    ```

    This will run Express locally without watching for file changes
    ```
    cd api
    npm start
    ```

* UI
    ```
    cd ui
    npm start
    ```

## Hosting The UI From Express
    This will build the React front end and copy its files into the `api/build` directory so that they are served by Express.
    ```
    cd ui
    npm run-script deploy-to-express
    ```

## Implementer's Notes

* The port that the Express back end listens on is defined in `api/bin/www`.
* The port that the React UI listens to is defined in `ui/package.json`. See 'start' script.