resource "aws_dynamodb_table" "dynamodb" {
    hash_key         = "pk"
    range_key        = "sk"
    name             = "${var.app_name}_${terraform.workspace}"
    stream_enabled   = true
    stream_view_type = "NEW_AND_OLD_IMAGES"
    billing_mode     = "PAY_PER_REQUEST"

    point_in_time_recovery {
        enabled = true
    }

    attribute {
        name = "pk"
        type = "S"
    }

    attribute {
        name = "sk"
        type = "S"
    }

    attribute {
        name = "type"
        type = "S"
    } 

    attribute {
        name = "type1"
        type = "S"
    } 

    attribute {
        name = "type2"
        type = "S"
    } 

    attribute {
        name = "type3"
        type = "S"
    } 

    attribute {
        name = "type4"
        type = "S"
    } 

    attribute {
        name = "type5"
        type = "S"
    } 

    global_secondary_index {
        name            = "type-pk-index"
        hash_key        = "type"
        range_key       = "pk"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "type-sk-index"
        hash_key        = "type"
        range_key       = "sk"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "pk-type-index"
        hash_key        = "pk"
        range_key       = "type"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "sk-type-index"
        hash_key        = "sk"
        range_key       = "type"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "type-index"
        hash_key        = "type"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "type1-index"
        hash_key        = "type1"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "type2-index"
        hash_key        = "type2"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "type3-index"
        hash_key        = "type3"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "type4-index"
        hash_key        = "type4"
        projection_type = "ALL"
    }

    global_secondary_index {
        name            = "type5-index"
        hash_key        = "type5"
        projection_type = "ALL"
    }
}
