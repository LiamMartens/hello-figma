# Figma OAuth2 integration for Hello.js
Easily integrate Figma's OAuth2 authentication with your web application using Hello.js

## Usage
```javascript
import hello from 'hellojs';
import hellofigma from 'hello-figma';

// add figma integration to hellojs
hellofigma(hello);

// initialize figma integration
hello.init({
    figma: 'CLIENT_ID'
});

// when creating an app with hello.js don't forget to add your client id and secret to https://auth-server.herokuapp.com/
// this is necessary because of the explicit grant authorization Figma is using (more info here https://adodson.com/hello.js/#oauth-proxy)
hello('figma').login({
    redirect_uri: 'YOUR_REDIR_URI'
}).then(() => {
    console.log('logged in');
}, err => {
    console.warn(err)
});

// you can also call the figma endpoints using hellojs after authenticatiing
hello('figma').api('file', {
    key: 'FILE_KEY'
}).then(r => {
    console.log(r);
});
```

## API endpoints
At the time of writing following API endpoints have been implemented

### GET file
```javascript
    hello('figma').api('file', {
        key: 'FILE_KEY'
    });
```

### GET file/comments
```javascript
    hello('figma').api('file/comments', {
        key: 'FILE_KEY'
    });
```

### GET file/images
```javascript
    hello('figma').api('file/images', {
        key: 'FILE_KEY',
        ids: '..',
        ...otherQueryParams
    });
```

### GET file/versions
```javascript
    hello('figma').api('file/versions', {
        key: 'FILE_KEY
    });
```

### GET team/projects
```javascript
    hello('figma').api('team/projects', {
        team: 'TEAM_ID'
    });
```

### GET team/files
```javascript
    hello('figma').api('team/files', {
        project: 'TEAM_PROJECT_ID'
    });
```

### POST file/comment
```javascript
    hello('figma').api('file/comment', 'post', {
        key: 'FILE_KEY',
        message: 'Some comment',
        client_meta: {x:0, y:0}
    });
```

Don't forget to check out the official [Figma docs](https://www.figma.com/developers)