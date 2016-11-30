#!/usr/bin/env bash
## path:
ROOT_PATH=$(dirname $BASH_SOURCE);

## basic alias:
alias bi='bower install';
alias bir='bower install --allow-root';
alias bi-s='bower install --save';
alias bi-d='bower install --save-dev';


## uninstall
alias bu='bower uninstall';
alias bu-s='bower uninsatll --save';
alias bu-d='bower uninstall --save-dev';

## cache:
alias bi-clean='bower cache clean';
alias bi-list='bower cache list';
