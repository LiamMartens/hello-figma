export default hello => {
    const version = 1;

    hello.init({
        figma: {
            name: 'Figma',

            oauth: {
                version: 2,
                auth: 'https://www.figma.com/oauth',
                grant: 'https://www.figma.com/api/oauth/token',
                response_type: 'code'
            },

            scope: {
                file_read: 'file_read'
            },

            base: `https://api.figma.com/v${version}/`,

            get: {
                'file': 'files/@{key}',
                'file/comments': 'files/@{key}/comments',
                'file/images': 'images/@{key}',
                'team/projects': 'teams/@{team}/projects',
                'team/files': 'projects/@{project}/files'
            },

            post: {
                'file/comment': 'files/@{key}/comments'
            },

            xhr: p => {
                p.headers = p.headers || {};
                const token = p.query.access_token;
                delete p.query.access_token;

                if(token) {
                    p.headers.Authorization = `Bearer ${token}`;
                }

                if(p.method !== 'get' && p.data) {
                    p.headers['Content-Type'] = 'application/json';
                    if(typeof(p.data) === 'object') {
                        p.data = JSON.stringify(p.data);
                    }
                }

                return true;
            }
        }
    })
}