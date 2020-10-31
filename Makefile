NAME   =  WillBrownsbergerComFilter
TARGET =  $(NAME).zip
# I don't know why Chrome supports packing extensions if the Chrome Web Store
# doesn't support uploading .crx files and a .crx file that isn't published in
# the web store can't be run in Chrome. But maybe this will become clear later,
# so I'm leaving in place here the code for packing the extension, in case I
# need to use it later.
#TARGET =  $(NAME).crx
UNAME  := $(shell uname)

ifeq ($(UNAME),Darwin)
  CHROME=/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
else
  CHROME=google-chrome
endif

ifneq (,$(wildcard $(NAME).pem))
  KEY_ARG=--pack-extension-key=$(NAME).pem
endif

all: $(TARGET)

clean: ; -rm -rf *.zip *.crx $(NAME) *~

$(NAME).crx: manifest.json content.js options.html options.js
	echo $(OS)
	-rm -rf $(NAME)
	mkdir $(NAME)
	cp $^ $(NAME)
	"$(CHROME)" --pack-extension=$(NAME) $(KEY_ARG)

$(NAME).zip: manifest.json content.js options.html options.js icon.png
	echo $(OS)
	zip -r $(NAME).zip $^
