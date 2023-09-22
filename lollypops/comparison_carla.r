# define current year visits in percentage
percentage_visits <- (sum(MYMETA_VISITS_MODEL$`Number of visits`) / sum(MYMETA_VISITS_MODEL_1$`Number of visits`)) * 100

# define the new dataframe
data <- data.frame(
  series = c("Visits year selected (%)", rep("Comparison", nrow(MYMETA_VISITS_MODEL_1))),
  value = c(percentage_visits, MYMETA_VISITS_MODEL_1$`Number of visits`)
)

# Aggregate the data by series
data_agg <- aggregate(value ~ series, data, sum)

darkBlue <- "#004EA8"
lightBlue <- "#b0cce8"

# Set the margins using par()
par(mar = c(1, 1, 1, 1))

# Define the plot limits based on the maximum value of value_s and value_c
plot(NULL, xlim=c(0, max(data_agg$value[1]) * 5), ylim=c(0, nrow(data_agg) + 0.5),
     xlab="", ylab="", axes=FALSE, xaxs="i", yaxs="i", xaxt="n", yaxt="n")

# Define the center of the plot
x_center <- max(data_agg$value[1]) / 0.6

# Define the plot limits based on the maximum value of value_s and value_c
plot(NULL, xlim=c(0, x_center + max(data_agg$value[1]) * 2.5), ylim=c(0, nrow(data_agg) + 0.5),
     xlab="", ylab="", axes=FALSE)


# Draw the lollipops
col1 <- lightBlue
col2 <- darkBlue

if (percentage_visits >= 100) {
  col3 <- "#7FEBE2"   # Green color for percentage_visits >= 100
} else {
  col3 <- "#FA7A5A"     # Red color for percentage_visits < 100
}

# Calculate the maximum value from both rows
max_value <- max(data_agg$value[1])

# Draw the horizontal lines for the Selected series
segments(x_center, 0.8, x_center + data_agg$value[1], col=col1, lwd=15)

# Add circles at the end of the lines for the Selected series
points(x_center + data_agg$value[1]+ max(data_agg$value[1]) * 0.05, 0.8, col=col1, pch=1, cex=8, lwd=15)

# Add labels for the values for the Selected series
text(x_center + data_agg$value[1]+(data_agg$value[1]+ max_value) * 0.2, 0.8, labels=sprintf("%.0f", data_agg$value[1]), pos=4, cex=5, col=col1)
text(x_center + 0.5*max(data_agg$value[1]),0.5, labels=sprintf("Last Year"), pos=1, cex=5, col=col1)

# Calculate the adjusted length for the Completed Visits (second row)
adjusted_length <- max_value * data_agg$value[2] / 100

# Draw the horizontal lines for the Comparison series
segments(x_center, 1.7, x_center + adjusted_length, col=col2, lwd=15)

# Add circles at the end of the lines for the Comparison series
points(x_center + adjusted_length + max(data_agg$value[1]) * 0.05 , 1.7, col=col2, pch=1, cex=8, lwd=15)

# Add labels for the values for the Comparison series
text(x_center + adjusted_length + (adjusted_length + max_value) * 0.2,1.7, labels=sprintf("%.0f%%", data_agg$value[2]), pos=4, cex=5,col=col3)
# Add the legend
# legend("topright", legend=c("Selected", "Comparison"), col=c(darkBlue, lightBlue), pch=c(1,2), lwd=15, cex=3)