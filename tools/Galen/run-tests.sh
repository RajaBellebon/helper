#!/bin/bash
set CurrDir = %CD%

galen test tests/homepage.test.js --htmlreport reports
