service postgresql restart
export PATH=$PATH:/usr/local/go/bin
cd /nyasite/nyasiteBackend/
CGO_ENABLED=1 go run . &
cd /nyasite/nyasiteFrontend
npm install
npm run dev
#start backend and frontend not include nodebb