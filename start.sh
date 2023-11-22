export PATH=$PATH:/usr/local/go/bin
cd /nyasite/nyasiteNodeBB
node nodebb start &
cd /nyasite/nyasiteBackend/
CGO_ENABLED=1 go run . &
cd /nyasite/nyasiteFrontend
npm install
npm run dev