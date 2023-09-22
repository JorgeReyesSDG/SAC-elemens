# Define the dates
start_selected_calc <- MYMETA_SALES_MODEL$calcMonth_start[1]
end_selected_calc <- MYMETA_SALES_MODEL$calcMonth_end[1]
start_comparison_calc <- MYMETA_SALES_MODEL$calcMonth_start_comparison[1]
end_comparison_calc <- MYMETA_SALES_MODEL$calcMonth_end_comparison[1]

date1 <- as.Date(sprintf("%s-%s-01",
                         start_selected_calc%/%100,
                         start_selected_calc%%100+1
                 ))
date2 <- as.Date(sprintf("%s-%s-01",
                         end_selected_calc%/%100,
                         end_selected_calc%%100+2
                 ))
date3 <- as.Date(sprintf("%s-%s-01",
                         start_comparison_calc%/%100,
                         start_comparison_calc%%100+1
                 ))
date4 <- as.Date(sprintf("%s-%s-01",
                         end_comparison_calc%/%100,
                         end_comparison_calc%%100+2
                 ))

# Convert `Requested delivery date` to dates
MYMETA_SALES_MODEL$Date <- as.Date(MYMETA_SALES_MODEL$Date, format = "%Y-%m-%d")

# Filter the data based on the date ranges
selected_data <- subset(MYMETA_SALES_MODEL, Date >= date1 & Date < date2)
comparison_data <- subset(MYMETA_SALES_MODEL, Date >= date3 & Date < date4)

if (nrow(selected_data)==0 && nrow(comparison_data)==0){
  data <- data.frame(
  series = c("Selected", "Comparison"),
  value = c(1,0)
	)
} else if(nrow(selected_data)==0){
  	data <- data.frame(
  		series = c("Selected", rep("Comparison", nrow(comparison_data))),
  		value = c(0,comparison_data$`Quantity`)
	)
   print('here')
} else if(nrow(comparison_data)==0){
  	data <- data.frame(
  		series = c(rep("Selected", nrow(selected_data)), "Comparison"),
  		value = c(selected_data$`Quantity`,0)
	)
} else{
  # Define the data for the plot
  data <- data.frame(
    series = c(rep("Selected", nrow(selected_data)), rep("Comparison", nrow(comparison_data))),
    value = c(selected_data$`Quantity`,
    comparison_data$`Quantity`)
  )
}

# Aggregate the data by series
data_agg = aggregate(value ~ series, data, sum)

# define current year visits in percentage
# Prevent no pass year
if (data_agg$value[1]==0){
  	percentage_previous <- 100
} else{
	percentage_previous <-data_agg$value[2]/data_agg$value[1]*100
}

# Define the colors
darkBlue <- "#004EA8"
lightBlue <- "#b0cce8"
white <- "#ffffff"

# common settings
lwd <- 30 # line width
scale <- 1000 # measure scale
units <- 'k' # units
cex <- 15 # radius of the circle
text_size <- 6 # text size
number_size <- 9 # measure text size
xfactor <- 1.4
yfactor <- 1
x_barlength <- 50
x_barlength_1 <- data_agg$value[1]/max(data_agg$value)*x_barlength
x_barlength_2 <- data_agg$value[2]/max(data_agg$value)*x_barlength

# Set the margins using par()
par(mar = c(1, 1, 1, 1))

# Define the center of the plot
x_center <- 0
y_0 <- 40
y_step <-  45

# Define the plot limits based on the maximum value of value_s and value_c
plot(NULL, xlim=c(0, 100), ylim=c(0, 100), xlab="", ylab="", axes=FALSE)

# Draw the lollipops
col1 <- lightBlue
col2 <- darkBlue

if (percentage_previous >= 100) {
  col3 <- "#7FEBE2"   # Green color for percentage_visits >= 100
} else {
  col3 <- "#FA7A5A"     # Red color for percentage_visits < 100
}

# Draw the horizontal lines for the Selected series
segments(0, y_0, x_barlength_1, col=col1, lwd=lwd)

# Add circles at the end of the lines for the Selected series
points(x_barlength_1 + 2.5, y_0, col=col1, pch=1, cex=cex, lwd=lwd)

# Add labels for the values for the Selected series
text(100, y_0, labels=sprintf("%.2f %s", data_agg$value[1]/scale,units), pos=2, cex=number_size, col=col1)
# Add labels for the previous period
text(0, 7, labels=sprintf("Last Year"), pos=4, cex=text_size, col=col1)

# Draw the horizontal lines for the Comparison series
segments(0, y_0 + y_step, x_barlength_2, col=col2, lwd=lwd)

# Add circles at the end of the lines for the Comparison series
points(x_barlength_2 + 2.5 , y_0 + y_step, col=col2, pch=1, cex=cex, lwd=lwd)

# Add labels for the values for the Comparison series
text(100, y_0 + y_step, labels=sprintf("%.0f %%", percentage_previous), pos=2, cex=number_size, col=col3)
# Add the legend
# legend("topright", legend=c("Selected", "Comparison"),
#col=c(darkBlue, lightBlue), pch=c(1,2), lwd=15, cex=3)