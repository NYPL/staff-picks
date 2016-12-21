# Staff Picks

# To set up

- Clone repository
- `npm install`
- `npm start`
- Navigate to http://localhost:3001/books-music-dvds/recommendations/staff-picks/

# To create a release

- Go to Bamboo http://bamboo.nypl.org/browse/NA-SWR
- Click on Deployments in the secondary navigation panel
- Click on chosen environment (development, qa, production)
- Click the ... on top right (under Search) and select 'Create release'
- Select 'Create new release from build result'
- Name release according to local naming conventions (e.g. master-v2.15)
- Create release

# To deploy to branch from release

- Go to Bamboo http://bamboo.nypl.org/browse/NA-SWR
- Click on Deployments in the secondary navigation panel
- Click on chosen environment (development, qa, production)
- Click Deploy on top right (under Search) and again select environment
- Select 'Promote existing release to this environment'
- Select release and start deployment
