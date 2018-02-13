'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary'),
  ]).then((urls) => {
    return {
      useYarn: true,
      scenarios: [
        {
          name: 'ember-lts-2.8',
          bower: {
            dependencies: {
              'ember': 'components/ember#lts-2-8'
            },
            resolutions: {
              'ember': 'lts-2-8'
            }
          },
          npm: {
            devDependencies: {
              'ember-source': null
            },
            dependencies: {
              'ember-data': '~2.8.0'
            }
          }
        },
        {
          name: 'ember-lts-2.12',
          bower: {
            dependencies: {
              'ember': null
            }
          },
          npm: {
            devDependencies: {
              'ember-source': '~2.12.0'
            },
            dependencies: {
              'ember-data': '~2.12.0'
            }
          }
        },
        {
          name: 'ember-lts-2.16',
          npm: {
            devDependencies: {
              'ember-source': '~2.16.0'
            },
            dependencies: {
              'ember-data': '~2.16.0'
            }
          }
        },
        {
          name: 'ember-release',
          npm: {
            devDependencies: {
              'ember-source': urls[0]
            },
            dependencies: {
              'ember-data': 'github:emberjs/data#release'
            }
          }
        },
        {
          name: 'ember-beta',
          npm: {
            devDependencies: {
              'ember-source': urls[1]
            },
            dependencies: {
              'ember-data': 'github:emberjs/data#beta'
            }
          }
        },
        {
          name: 'ember-canary',
          npm: {
            devDependencies: {
              'ember-source': urls[2]
            },
            dependencies: {
              'ember-data': 'github:emberjs/data#master'
            }
          }
        },
        {
          name: 'ember-default',
          npm: {
            devDependencies: {},
            depenencies: {}
          }
        }
      ]
    };
  });
};
