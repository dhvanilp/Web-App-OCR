## Linux Installation
The build instructions for Linux also apply to other UNIX like operating systems.

### Dependencies

* A compiler for C and C++: GCC or Clang
* GNU Autotools: autoconf, automake, libtool
* autoconf-archive
* pkg-config
* [Leptonica](http://www.leptonica.org/)
* libpng, libjpeg, libtiff

### Ubuntu

If they are not already installed, you need the following libraries (Ubuntu 16.04/14.04):
```
sudo apt-get install g++ # or clang++ (presumably)
sudo apt-get install autoconf automake libtool
sudo apt-get install autoconf-archive
sudo apt-get install pkg-config
sudo apt-get install libpng-dev
sudo apt-get install libjpeg8-dev
sudo apt-get install libtiff5-dev
sudo apt-get install zlib1g-dev
```
if you plan to install the training tools, you also need the following libraries: 
```
sudo apt-get install libicu-dev
sudo apt-get install libpango1.0-dev
sudo apt-get install libcairo2-dev
```

### Leptonica

You also need to install [Leptonica](http://www.leptonica.org/). Ensure that the development headers for Leptonica are installed before compiling Tesseract.

Tesseract versions and the minimum version of Leptonica required:

**Tesseract** | **Leptonica** | **Ubuntu**
:-------------------: | :---------------------------------------: | :---------
4.00 | 1.74.2 | Must build from source 
3.05 | 1.74.0 | Must build from source 
3.04 | 1.71 | [Ubuntu 16.04](http://packages.ubuntu.com/xenial/libtesseract3)
3.03 | 1.70 | [Ubuntu 14.04](http://packages.ubuntu.com/trusty/libtesseract3)
3.02 | 1.69 | [Ubuntu 12.04](http://packages.ubuntu.com/precise/libtesseract3)
3.01 | 1.67 |

One option is to install the distro's Leptonica package: 

```
sudo apt-get install libleptonica-dev
```

**but if you are using an oldish version of Linux, the Leptonica version may be too old, so you will need to build from source.**

The sources are at https://github.com/DanBloomberg/leptonica . The instructions for building are given in [Leptonica README](http://www.leptonica.org/source/README.html).

Note that if building Leptonica from source, you may need to ensure that /usr/local/lib is in your library path. This is a standard Linux bug, and the information at [Stackoverflow](http://stackoverflow.com/questions/4743233/is-usr-local-lib-searched-for-shared-libraries) is very helpful.

## Installing Tesseract from Git

Please follow instructions in [https://github.com/tesseract-ocr/tesseract/wiki/Compiling--GitInstallation](https://github.com/tesseract-ocr/tesseract/wiki/Compiling-%E2%80%93-GitInstallation)

Also read [Install Instructions](https://github.com/tesseract-ocr/tesseract/blob/master/INSTALL.GIT.md)

## Install elsewhere / without root

Tesseract can be configured to install anywhere, which makes it possible to install it without root access.

To install it in $HOME/local:

```
./autogen.sh
./configure --prefix=$HOME/local/
make
make install
```

To install it in $HOME/local using Leptonica libraries also installed in $HOME/local:

```
./autogen.sh
LIBLEPT_HEADERSDIR=$HOME/local/include ./configure \
  --prefix=$HOME/local/ --with-extra-libraries=$HOME/local/lib
make
make install
```


## Video representation of the Compiling process for Tesseract 4.0 and Leptonica 1.7.4 on Ubuntu 16.xx

  * Video [Build from Source Leptonica 1.7.4](https://www.youtube.com/watch?v=vOdnt2h1U8U)
  * Video [Build from Source Tesseract-OCR 4.0](https://www.youtube.com/watch?v=WZLJucXZy-g)


## Language Data

  * Download the [data file(s) for the language(s) you interest in](https://github.com/tesseract-ocr/tesseract/wiki/Data-Files).
  * Move it to the `tessdata` directory (e.g. 'mv tessdata $TESSDATA\_PREFIX' if defined `TESSDATA_PREFIX`)

You can also use:
```
export TESSDATA_PREFIX=/some/path/to/tessdata
```
to point to your tessdata directory (example: if your tessdata path is '/usr/local/share/tessdata' you have to use 'export TESSDATA\_PREFIX='/usr/local/share/').