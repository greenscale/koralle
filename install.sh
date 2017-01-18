#!/bin/sh

TARGET=/usr/local/bin/
PROG="koralle"
NODEMOD="/usr/lib/node_modules"
SCRIPT=build/$PROG.js

if [ "$(id -u)" != "0" ]; then
	echo "user is not root, press enter to install to $HOME/bin/, ctrl+c to exit"
	read
	TARGET="$HOME/bin/"
fi

if [ ! -d $NODEMOD ]; then
	NODEMOD="/usr/local/bin/node_modules"
	if [ ! -d $NODEMOD ]; then
		echo -e "no node_modules folder exiting"
		exit 1
	fi
fi

echo -e "--building--"
[ -f makefile ] && make

echo -e '--installing script--'
cp "$SCRIPT" "$TARGET"

echo -e '--adding executable script--'
cat - << ENTEIMKELENTE > $TARGET/$PROG
#!/bin/sh
NODE="/usr/bin/env node"
NODE_MODULES="$NODEMOD"
\$NODE $TARGET/$PROG.js \$@
ENTEIMKELENTE

chmod +x $TARGET/$PROG

