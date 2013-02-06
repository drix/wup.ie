Instalation:
Require:

LAMP – you can download XAMPP on and install.
	- add to <XAMPP_PATH>/apache/conf/extra/httpd-vhosts.conf at the end of the file: 
	
	NameVirtualHost *:80
	<VirtualHost *:80>
		DocumentRoot "<SYMFONY_WEB_PATH>"
		ServerName wup.ie
		ServerAlias wup.ie 
		<Location />
			Options Indexes FollowSymLinks
			AllowOverride All
			Order allow,deny
			Allow from all
		</Location>
	</VirtualHost>
	
	*restart apache service

- edit the file c:/windows/drivers/etc/hosts at the end add:
127.0.0.1	wup.ie
