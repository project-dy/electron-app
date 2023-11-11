cp dist build -r
cd build
rm -rf builder-* -rf
mv running* ../running.exe
cd ..
zip -r dist/build.zip build
tar -zcvf dist/build.tar.gz build
rm -rf build
zip dist/build-portable.zip running.exe
tar -zcvf dist/build-portable.tar.gz running.exe
rm -rf running.exe